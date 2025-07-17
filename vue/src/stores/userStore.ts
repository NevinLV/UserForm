import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type {User} from "../types/user.ts";

export const useUserStore = defineStore('user', () => {
    const users: Ref<User[]> = ref([]);


    /**
     * Добавить пользователя
     * @param formData
     */
    const addUser = (formData: User) => {
        const user = formData;

        // Валидация пароля для LDAP
        if (user.type === 'LDAP' && !user.password) {
            throw new Error('Для пользователя типа "LDAP" требует пароль');
        }

        users.value.push(user);
    };

    /**
     * Обновить пользователя
     * @param index
     * @param formData
     */
    const updateUser = (index: number, formData: User) => {
        const user = formData;

        // Валидация пароля для LDAP
        if (user.type === 'LDAP' && !user.password) {
            throw new Error('Для пользователя типа "LDAP" требует пароль');
        }

        users.value[index] = user;
    };

    /**
     * Удалить пользователя
     * @param index
     */
    const deleteUser = (index: number) => {
        users.value.splice(index, 1);
    };


    return {
        users,
        addUser,
        updateUser,
        deleteUser,
    };
});