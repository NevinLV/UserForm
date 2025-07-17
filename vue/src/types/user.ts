export type User = {
    labels: { text: string }[];
    type: 'local' | 'LDAP';
    login: string;
    password?: string;
}
