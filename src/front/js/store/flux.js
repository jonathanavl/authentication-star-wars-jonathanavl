const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            planets: [],
            vehicles: [],
            characters: [],
            isLoggedIn: false,
            currentUser: [],
            users: [],
            favorites: {
                planets: [],
                characters: [],
                vehicles: []
            }
        },
        actions: {
            async login(username, password) {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username, password })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Credenciales de inicio de sesión inválidas");
                    }

                    const data = await response.json();
                    const accessToken = data.access_token;

                    if (accessToken) {
                        localStorage.setItem("accessToken", accessToken);
                        console.log("Token almacenado:", accessToken); // Debug
                        await getActions().getCurrentUser();
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error al logear (flux.js):", error);
                    return false;
                }
            },

            logout: () => {
                localStorage.removeItem('access_token');  // Eliminar el token de localStorage
                setStore({ currentUser: null, isLoggedIn: false });  // Borrar el estado del usuario y establecer isLoggedIn a false
            },

            // Función para obtener el usuario autenticado usando el token almacenado
            async getCurrentUser() {
                const accessToken = localStorage.getItem('accessToken'); // Asegúrate de que este sea correcto
                if (!accessToken) return null;

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/current_user", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) throw new Error("Error fetching current user: " + response.statusText);

                    const currentUser = await response.json(); // Directamente asignamos el JSON devuelto
                    setStore({ currentUser, isLoggedIn: true });
                    console.log("Usuario actual obtenido:", currentUser); // Debug
                    return currentUser; // Retornamos el usuario actual directamente
                } catch (error) {
                    console.error("Error fetching current user: ", error);
                    return null;
                }
            },


            signup: async (userData) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData)
                    });

                    if (!response.ok) {
                        const errorData = await response.json(); // Obtener el mensaje de error del servidor
                        console.error("Error de registro: ", errorData.message); // Mostrar el mensaje de error en la consola
                        throw new Error(errorData.message || "Signup error"); // Lanzar un error con el mensaje
                    }

                    const data = await response.json();
                    setStore({ user: data });
                    return data;
                } catch (error) {
                    console.error("Error de registro: ", error);
                    return null;
                }
            },
            // Planets actions

            getPlanets: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/planets");
                    const data = await response.json();
                    setStore({ planets: data });
                    return data;
                } catch (error) {
                    console.error("Error fetching planets: ", error);
                }
            },

            getPlanetInfo: async (planetId) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/planets/${planetId}`);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching planet info: ", error);
                }
            },

            // Vehicles actions

            getVehicles: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/vehicles");
                    const data = await response.json();
                    setStore({ vehicles: data });
                    return data;
                } catch (error) {
                    console.error("Error fetching vehicles: ", error);
                }
            },

            getVehicleInfo: async (vehicleId) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/vehicles/${vehicleId}`);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching vehicle info: ", error);
                }
            },

            // Characters actions

            getCharacters: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/characters");
                    const data = await response.json();
                    setStore({ characters: data });
                    return data;
                } catch (error) {
                    console.error("Error fetching characters: ", error);
                }
            },

            getCharacterInfo: async (characterId) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/characters/${characterId}`);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching character info: ", error);
                }
            },

            // Favorites actions

            toggleFavorites: async (type, id) => {
                console.log(`Attempting to toggle favorite for ${type} with id ${id}`);
            
                if (!type || !id) {
                    console.error("Invalid type or id");
                    return null;
                }
            
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('No access token found');
                    return null;
                }
            
                const isFavorite = getActions().isFavorite(type, id);
                const method = isFavorite ? 'DELETE' : 'POST';
                const url = `${process.env.BACKEND_URL}/api/favorites/${type}/${id}`;
            
                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`
                        },
                        credentials: 'include'
                    });
            
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || `Error toggling favorite. Status: ${response.status}`);
                    }
            
                    console.log('Favorite toggled successfully');
                    await getActions().getUserFavorites(); // Update favorites
                    console.log('User favorites updated');
                } catch (error) {
                    console.error("Error toggling favorite: ", error.message);
                    throw error;
                }
            },
            
            getUserFavorites: async () => {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('No access token found');
                    return null;
                }
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/favorites`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
            
                    if (!response.ok) {
                        throw new Error(`Error fetching favorites. Status: ${response.status}`);
                    }
            
                    const data = await response.json();
                    setStore({ favorites: data });
                    return data;
                } catch (error) {
                    console.error("Error fetching favorites: ", error);
                    throw error;
                }
            },            
            loadFavorites: async () => {
                try {
                  const response = await fetch(`${process.env.BACKEND_URL}/api/users/favorites`, {
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    credentials: 'include'
                  });
                  if (!response.ok) throw new Error('Failed to load favorites');
                  const data = await response.json();
                  setStore({ favorites: data });
                } catch (error) {
                  console.error("Error loading favorites:", error);
                }},

            isFavorite: (type, id) => {
                const store = getStore();
                const favorites = store.favorites[type] || [];
                return favorites.some(fav => fav.id === id);
            },
            
        }
    };
};

export default getState;
