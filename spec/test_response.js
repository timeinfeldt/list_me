var testResponse = {
    success: {
        status: 200,
        responseText: '{"cont":"true", "persons":[{"id":1, "name":"John"}]}'
    },
    notFound: {
        status: 404,
        responseText: 'not found'
    },
    end: {
        status: 200,
        responseText: '{"cont":false}'
    },
    preview: {
        status: 200,
        responseText: '{"persons":[{"id":1, "name":"John"},{"id":2, "name":"Hanne"},{"id":3, "name":"Simon"},{"id":4, "name":"Stuart"},{"id":5, "name":"David"},{"id":6, "name":"Anne"}]}'
    }
}
