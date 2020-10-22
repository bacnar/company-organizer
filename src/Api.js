import axios from "axios";

export function fetchRoles() {
  return axios.get(`http://localhost:8080/roles/`);
}

export function fetchStations() {
  return axios.get(`http://localhost:8080/stations/`);
}

export function fetchUsers() {
  return axios.get(`http://localhost:8080/users/`);
}

export function addUser(name, stationId, roleId, username, email, password) {
  return axios.post(`http://localhost:8080/users/`, {
    name: name,
    stationId: stationId,
    roleId: roleId,
    username: username,
    email: email,
    password: password,
  });
}

export function deleteUser(id) {
  return axios.delete(`http://localhost:8080/users/${id}`);
}

export function updateUser(
  id,
  name,
  stationId,
  roleId,
  username,
  email,
  password
) {
  return axios.put(`http://localhost:8080/users/`, {
    id: id,
    name: name,
    stationId: stationId,
    roleId: roleId,
    username: username,
    email: email,
    password: password,
  });
}
