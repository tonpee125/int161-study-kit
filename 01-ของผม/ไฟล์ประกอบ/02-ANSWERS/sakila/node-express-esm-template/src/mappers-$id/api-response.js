// {student-id} - {student-name}
export async function apiResponse(res, data, pagination = null, status = 200) {
    const mode = 'sakila';
    if (mode === 'sakila') return res.status(status).json(status === 201 ? {result: data} : data);
    if (mode === 'classic') return res.status(status).json({status: 'success', data});
    const response = {success: true, data, timestamp: new Date().toISOString()};
    if (pagination) {
        const {page, limit} = pagination;
        const total = data.totalItems;
        response.pagination = {total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page * limit < total, hasPrevPage: page > 1};
    }
    return res.status(status).json(response);
}
