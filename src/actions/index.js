let nextProjectId = 0;
export const addProject = (title, subtitle, avatar, description) => ({
    type: 'ADD_PROJECT',
    id: nextProjectId++,
    payload: {
        title,
        subtitle,
        avatar,
        description
    }
});

export const currentWindow = (window) => ({
    type: 'CURRENT_WINDOW',
    payload: {
        window
    }
});