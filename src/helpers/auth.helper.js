// import corpBackend from "@/api/corpBackend.api";
// import apiConfig from "@/config/api.config";

export const login = async (username, password) => {
    try {
        const result = await corpBackend.post(
            apiConfig.authenticateUserEndpoint,
            { username, password },
            {
                headers: {
                    "api-key": process.env.CORP_API_KEY,
                },
            }
        );

        if (result.data.data.authenticate) {
            return { error: null, user: result?.data?.data?.user };
        }
    } catch (error) {
        console.log(error);

        if (error.code === "ECONNREFUSED")
            return {
                error: {
                    errorMessage: "The server is down. Please try again later!",
                },
                user: null,
            };

        return { error: error?.response?.data?.data, user: null };
    }
};
