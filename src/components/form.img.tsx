/* eslint-disable no-unused-vars */
import { SyntheticEvent } from "react";

export function FormImg() {
  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formNewUser = ev.currentTarget;
    const picture = (formNewUser[0] as HTMLFormElement).value;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userImg">
        Picture:
        <input type="file" name="userImg" id="userImg" />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

// Devuelve un Array donde en la posición 0 hay un object tipo File.
// Se puede subir al servidor Node.
// Almacenar foto en otro sitio y luego tomarla de ahí. Desde ahí tenemos una URL que es lo que guardamos en la base de datos.
// Para esto hay que agregar en Node el multer js.
// Subir a Firebase, Supabase o Cloudinary.
