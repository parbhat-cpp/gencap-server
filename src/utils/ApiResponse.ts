import httpStatus from "http-status";

export class ApiResponse {
    public data: any;
    public error: any;
    public status_code: number;

    constructor() {
        this.status_code = httpStatus.OK;
        this.error = null;
        this.data = null;
    }
}
