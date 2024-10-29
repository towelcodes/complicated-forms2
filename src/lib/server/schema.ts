export interface FormsRow {
    id: number;
    created_at: Date;
    open: boolean;
    data: FormData;
    private?: boolean;
    expiry?: Date;
    secret?: string;
}

export interface SubmissionsRow {
    id: number;
    created_at: Date;
    form_data: FormData;
    for_id: number;
    ip_address?: string;
}