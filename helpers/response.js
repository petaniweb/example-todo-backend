const STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

function statusMessage(status) {
  switch (status) {
    case STATUS.OK:
      return "Success"
    case STATUS.BAD_REQUEST:
      return "Bad Request";
    case STATUS.NOT_FOUND:
      return "Not Found";
    case STATUS.SERVER_ERROR:
      return "Internal Server Error";
  }
}

function jsonResponse(res, body, options) {
  options = options || {};
  options.status = options.status || STATUS.OK;
  res.status(options.status).json(body || null);
}

const response = {
  ok: function (req, res, data) {
    const body = {
      message: statusMessage(STATUS.OK),
      data,
    };

    jsonResponse(res, body, {
      status: STATUS.OK,
    });
  },
  badRequest: function (req, res, errors) {
    errors = Array.isArray(errors) ? errors : [errors];

    var body = {
      message: statusMessage(STATUS.BAD_REQUEST),
      errors: errors,
    };

    jsonResponse(res, body, {
      status: STATUS.BAD_REQUEST,
    });
  },

  notFound: function (req, res) {
    var body = {
      message: statusMessage(STATUS.NOT_FOUND),
    };

    jsonResponse(res, body, {
      status: STATUS.NOT_FOUND,
    });
  },

  serverError: function (req, res, error) {
    if (error instanceof Error) {
      error = {
        message: error.message,
        stacktrace: error.stack,
      };
    }
    var body = {
      message: statusMessage(STATUS.SERVER_ERROR),
      error: error,
    };

    jsonResponse(res, body, {
      status: STATUS.SERVER_ERROR,
    });
  },
};

module.exports = response;
