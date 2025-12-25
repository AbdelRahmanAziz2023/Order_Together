import { Colors } from "@/src/constants/colors";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ButtonStyle = "default" | "cancel" | "destructive";

export interface AlertButton {
  text: string;
  style?: ButtonStyle;
  onPress?: () => void;
}

export interface AlertOptions {
  title?: string;
  message?: string;
  buttons?: AlertButton[];
  cancelable?: boolean;
}

// a module-scoped setter injected by the provider so any module can call showAppAlert
let globalShow: ((opts: AlertOptions) => Promise<number | null>) | null = null;

export function showAppAlert(opts: AlertOptions) {
  if (!globalShow) {
    console.warn("AppAlert not mounted yet — call will be ignored.");
    return Promise.resolve(null);
  }
  return globalShow(opts);
}

export const AppAlertProvider: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [opts, setOpts] = useState<AlertOptions>({});
  const [resolver, setResolver] = useState<((i: number | null) => void) | null>(null);

  useEffect(() => {
    globalShow = (options: AlertOptions) => {
      return new Promise((resolve) => {
        setOpts(options);
        setResolver(() => resolve);
        setVisible(true);
      });
    };

    return () => {
      globalShow = null;
    };
  }, []);

  const buttons = useMemo(() => {
    if (!opts.buttons || opts.buttons.length === 0) {
      return [
        {
          text: "OK",
          style: "default" as ButtonStyle,
        },
      ];
    }
    return opts.buttons;
  }, [opts.buttons]);

  const handlePress = (index: number) => {
    const btn = buttons[index];
    setVisible(false);
    resolver?.(index);
    btn.onPress?.();
  };

  const onRequestClose = () => {
    setVisible(false);
    resolver?.(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={opts.cancelable ?? true ? onRequestClose : undefined}
    >
      <Pressable style={styles.backdrop} onPress={() => (opts.cancelable ? onRequestClose() : null)}>
        <View style={styles.container}>
          {opts.title ? <Text style={styles.title}>{opts.title}</Text> : null}
          {opts.message ? <Text style={styles.message}>{opts.message}</Text> : null}

          <View style={styles.buttonRow}>
            {buttons.map((b, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.button, b.style === "destructive" && styles.destructive]}
                onPress={() => handlePress(i)}
                activeOpacity={0.7}
              >
                <Text style={[styles.buttonText, b.style === "destructive" && styles.destructiveText]}>{b.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  container: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 18,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
  },
  destructive: {
    backgroundColor: Colors.red100,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  destructiveText: {
    color: Colors.red,
    fontWeight: "700",
  },
});

export default AppAlertProvider;
