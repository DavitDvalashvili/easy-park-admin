type ResponseStatus = {
  status:
    | "inserted"
    | "insert_exists"
    | "insert_error"
    | "updated"
    | "update_exists"
    | "update_error"
    | "deleted"
    | "delete_error";
  message: string;
  insert_id?: number | string;
};

type service = {
  description: string;
  serviceId?: number | string;
  languageId?: number | string;
  serviceName: string;
  title: string;
};
