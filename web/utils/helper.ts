export const formatDate = (date: string) => {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'long' })
    return month + " " + d.getDate();
}