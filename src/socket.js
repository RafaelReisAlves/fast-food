"use client";

import { io } from "socket.io-client";

export const socket =  io()

const connect = socket.connect("http://localhost:8080")

var id

connect.on("connect", () => {
  id = connect.id
})

export {id}