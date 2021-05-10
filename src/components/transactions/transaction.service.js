import http from "../../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/transactions/list");
  }

  get(id) {
    return http.get(`/transactions/li/${id}`);
  }

  create(data) {
    return http.post("/transactions/add", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();