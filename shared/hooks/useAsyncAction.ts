"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

/**
 * Opciones para {@link useAsyncAction}'s `run`.
 *
 * @typeParam T - Tipo del valor resuelto por la acción async.
 */
export type AsyncRunOptions<T = unknown> = {
  /** Toast de éxito. Si se omite, no se muestra toast al completar. */
  successMessage?: string;
  /**
   * Mensaje de error fijo, o función que lo deriva del error capturado.
   * Por defecto: `"Something went wrong."`
   */
  errorMessage?: string | ((error: unknown) => string);
  /** Se ejecuta solo si la acción resuelve correctamente. Recibe el resultado. */
  onSuccess?: (result: T) => void;
  /** Se ejecuta si la acción lanza. Recibe el error. */
  onError?: (error: unknown) => void;
  /**
   * Identificador opcional de la operación en curso (ej. id al borrar).
   * Se expone como `pendingKey` mientras corre y se limpia al terminar.
   */
  pendingKey?: string;
};

const resolveErrorMessage = (
  error: unknown,
  errorMessage: AsyncRunOptions["errorMessage"]
) => {
  if (typeof errorMessage === "function") {
    return errorMessage(error);
  }

  return errorMessage ?? "Something went wrong.";
};

/**
 * Hook genérico para orquestar acciones async (API, auth, etc.):
 * loading, toasts, callbacks y un `pendingKey` opcional.
 *
 * @returns
 * - `isLoading` — `true` mientras `run` está en curso.
 * - `pendingKey` — clave pasada en `options.pendingKey` (útil para deshabilitar una fila).
 * - `run` — ejecuta la acción y aplica loading / toast / callbacks.
 *
 * @example
 * ```ts
 * const { isLoading, run } = useAsyncAction();
 *
 * void run(() => createReservation(payload), {
 *   successMessage: "Listing reserved!",
 *   onSuccess: () => router.push("/trips"),
 * });
 * ```
 *
 * @example
 * ```ts
 * // Con pendingKey (borrado por id)
 * const { pendingKey: deletingId, run } = useAsyncAction();
 *
 * void run(() => deleteReservation(id), {
 *   successMessage: "Reservation cancelled",
 *   pendingKey: id,
 *   onSuccess: () => router.refresh(),
 * });
 * ```
 */
export const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingKey, setPendingKey] = useState("");

  /**
   * Ejecuta una acción async con manejo uniforme de loading y feedback.
   *
   * @typeParam T - Tipo del resultado de `action`.
   * @param action - Función que retorna una Promise (llamada API, etc.).
   * @param options - Mensajes, callbacks y `pendingKey` opcionales.
   * @returns `{ ok: true, result }` o `{ ok: false, error }`.
   *
   * @remarks
   * Desde un handler síncrono (click / submit) usa `void run(...)`
   * para indicar que la Promise se lanza a propósito sin `await`.
   */
  const run = useCallback(
    async <T,>(
      action: () => Promise<T>,
      options: AsyncRunOptions<T> = {}
    ) => {
      const { successMessage, errorMessage, onSuccess, onError, pendingKey: key } =
        options;

      setIsLoading(true);
      if (key) {
        setPendingKey(key);
      }

      try {
        const result = await action();

        if (successMessage) {
          toast.success(successMessage);
        }

        onSuccess?.(result);
        return { ok: true as const, result };
      } catch (error) {
        toast.error(resolveErrorMessage(error, errorMessage));
        onError?.(error);
        return { ok: false as const, error };
      } finally {
        setIsLoading(false);
        if (key) {
          setPendingKey("");
        }
      }
    },
    []
  );

  return { isLoading, pendingKey, run };
};
