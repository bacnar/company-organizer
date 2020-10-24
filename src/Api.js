import axios from "axios";

export function fetchRoles() {
  return axios.get(`http://localhost:8080/roles/`);
}

export function addRole(name) {
  return axios.post(`http://localhost:8080/roles/`, {
    name: name,
  });
}

export function deleteRole(id) {
  return axios.delete(`http://localhost:8080/roles/${id}`);
}

export function updateRole(id, name) {
  return axios.put(`http://localhost:8080/roles/`, {
    id: id,
    name: name,
  });
}

export function fetchStations() {
  return axios.get(`http://localhost:8080/stations/`);
}

export function addStation(name) {
  return axios.post(`http://localhost:8080/stations/`, {
    name: name,
  });
}

export function deleteStation(id) {
  return axios.delete(`http://localhost:8080/stations/${id}`);
}

export function updateStation(id, name) {
  return axios.put(`http://localhost:8080/stations/`, {
    id: id,
    name: name,
  });
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
