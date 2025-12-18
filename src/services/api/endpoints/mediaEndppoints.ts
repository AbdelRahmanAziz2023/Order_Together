import { baseApi } from "../baseApi";



const MediaEndpoints = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation<{url: string},FormData>({
            query: (body) => ({
                url: `media/upload`,
                method: "POST",
                body,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        }),
    }),
});

export const { useUploadImageMutation } = MediaEndpoints;