export const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function api<T>(
    path: string,
    init: RequestInit & { token?: string; idempotencyKey?: string } = {},
): Promise<T> {
    const { token, idempotencyKey, headers, ...rest } = init;
    const res = await fetch(`${API}${path}`, {
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
            ...(headers as Record<string, string>),
        },
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
            Array.isArray(body.message) ? body.message.join(', ') : (body.message ?? 'Có lỗi xảy ra'),
        );
    }
    return res.json();
}

export const vnd = (n: number) => n.toLocaleString('vi-VN') + 'đ';