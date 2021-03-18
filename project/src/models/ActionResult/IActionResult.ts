export interface IActionResult<T, R> {
    isSuccess: boolean;
    message: string | null;
    error: R | null;
    result: T | null;
}
