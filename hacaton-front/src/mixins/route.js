export default {
    methods: {
        isRouteAvailable(role) {
            const roleInStorage = localStorage.getItem('role');
            return roleInStorage && roleInStorage === role;
        }
    }
}