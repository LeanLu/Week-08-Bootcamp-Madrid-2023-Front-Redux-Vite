import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
// De cuando llegaba el token como Payload de Login
// import jwtDecode from "jwt-decode";

// Register: NO cambia el state.
// Se hacen operaciones a través de componentes, pero NO cambia el State de la app.

// Login: SI hay cambio de estado.
// Porque en la app necesitamos saber si el usuario está loggeado o no.
// Debe haber propiedad userLogged con todas las propiedades de ese usuario: Name, email, token, etc.

// Lista de usuarios: NO es lo mismo que el usuario loggeado.
// Entonces necesitamos 2 reducer.
// En principio lo vamos a agrupar en un reducer.

type state = {
  // Para un usuario loggeado
  // Puede ser "null" cuando no hay usuario loggeado.
  userLogged: {
    token: string;
    user: User;
  } | null;
  loadingUsersStratus: "loading" | "idle" | "error";

  // Listado de usuarios.
  // En este caso no es neceario darle la opción de "null" porque si no hay usuarios sería un array vacío.
  users: User[];
};

// De cuando llegaba el token como Payload de Login
// Definimos el type para el Token.
// Lo sacamos desde lo que está definido en el backend.
// type TokenPayloadTokenData = {
//   id: string;
//   email: string;
//   role: string;
// };

type LoginData = {
  token: string;
  user: User;
};

// Ejemplo de Thunk:
// const thunk = createAsyncThunk("name", async () => {});

export const asyncLoadUser = createAsyncThunk("user/loadUser", async () => {
  const resp = await fetch("Algo");
  return resp.json;
});

// Otro ejemplo de Thunk
// export const asyncLogin = createAsyncThunk<LoginData>(
//   "user/loadUser",
//   async () => {
//     const resp = await fetch("Algo");
//     return resp.json;
//   }
// );

const initialState: state = {
  userLogged: null,
  loadingUsersStratus: "idle",
  users: [],
};

const slice = createSlice({
  name: "user",
  initialState,

  // Propiedad obligatoria.
  // Tiene propiedades con el nombre de cada acción y qué hacer con ellas.
  reducers: {
    // El action va a tener un payload y un type.
    // Le damos el type del payload entre < >.
    // La action es lo que queremos asociar a ese estado.

    // De cuando llegaba el token como Payload de Login
    // El payload es lo que llega del backend.En este caso el Token.
    // El type es el "name" en este caso "user".
    // En este caso el Token.
    // State: Queremos que cambie el userLogged.

    // AL FINAL: definimos que el Payload que llega sea un object con Token y además la info de User:
    login(state, action: PayloadAction<LoginData>) {
      // El action.payload sería el Token.
      // Necesitamos extraer la info.
      // Para eso utilizamos un método de JWT.
      // Descargamos librería JWT Decode y utilizamos el método:

      // De cuando llegaba el token como Payload de Login
      // const tokenInfo: TokenPayloadTokenData = jwtDecode(action.payload);

      // Extraemos la información del token:
      state.userLogged = {
        token: action.payload.token,
        user: action.payload.user,
      };
    },

    // Para el logout no necesito payload porque no necesitamos recibir nada.

    logout(state) {
      // Cambiaría el state del userLogged a null.
      state.userLogged = null;
      // El array de users debe estar vacío porque si se desloguea no debería poder ver ningún listado.
      state.users = [];
    },

    // Para cargar el listado de users:
    // En este caso el payload será el user array.
    // Ese user Array vendrá desde el repo.
    loadUsers(state, action: PayloadAction<User[]>) {
      // En este caso actualizamos el state del listado de users.
      // Que será el payload que llega.
      state.users = action.payload;
    },

    // Agregamos un chageUserState cuando hay un cambio en UN usuario para agregar o quitar friends/enemies.
    // Porque genera un cambio en el state.
    // En este caso, del update, como payload es un user.
    updateRelation(state, action: PayloadAction<User>) {
      // Se actualiza el state del logged user con el payload que llega:
      // Le agregamos la exclamación para indicar que nunca va a ser "null" porque para hacer el updateRelation debería si o si estar logged.
      state.userLogged!.user = action.payload;

      // Actualizamos el listado todos los users con la nueva información updated del user particular:
      state.users = state.users.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },

  // Tiene la propiedad "extraReducer" para crear los casos como realizábamos antes.
  // extraReducers: (builder) => {
  //   builder.addCase(() =>({type: ''}), (state,  { payload }) => { payload })
  // }

  // Puedo procesar los Thunk con los extraReducer:
  // El Thunk tiene 3 métodos con los 3 estados.
  // fulfilled
  // Pending
  // Failed
  // extraReducers(builder) {
  //   builder.addCase(asyncLoadUser.pending, (state) => {
  //     state.loadingUsersStratus = "loading";
  //   });

  //   builder.addCase(asyncLoadUser.fulfilled, (state, action) => {
  //     state.loadingUsersStratus = "idle";
  //     state.users = action.payload;
  //   });

  //   builder.addCase(asyncLoadUser.rejected, (state) => {
  //     state.loadingUsersStratus = "error";
  //   });

  //   builder.addCase(asyncLogin.fulfilled, (state, action) => {
  //     state.userLogged = {
  //       token: action.payload.token,
  //       user: action.payload.user,
  //     };
  //   });
  // },
});

// Exportamos el Reducer:
export const { reducer } = slice;

// Exportamos las actions:
export const { login, logout, loadUsers, updateRelation } = slice.actions;

// Luego realizamos un dispatch de las distintas actions.
// Cada una pedirá el payload específico.
