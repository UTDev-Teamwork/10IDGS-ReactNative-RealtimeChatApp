import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>No deberías estar aquí wacho</h1>
      <p>Un error a ocurrido al procesar tu solicitud, regresa más tarde</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}