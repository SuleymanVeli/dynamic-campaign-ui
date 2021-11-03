export interface BaseModel<T> {
    data: T;
    hasError: boolean;
    error: any;
}