export function formatDate(date) {
    const newDate = new Date(date)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return newDate.toLocaleDateString("id-ID", options)
}