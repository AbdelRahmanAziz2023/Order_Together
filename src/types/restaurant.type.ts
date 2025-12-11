export interface MenuItemDto {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface MenuResponse{
  id: string;
  logoUrl: string | null;
  shortCode: string;
  name: string;
  menuItems: MenuItemDto[];
}

export interface RestaurantDto {
  id: string;
  shortCode: string | null;
  name: string;
  logoUrl: string | null;
  isVisible: boolean;
  isDeleted: boolean;
  menuItems?: MenuItemDto[]; // Optional menu items
}
