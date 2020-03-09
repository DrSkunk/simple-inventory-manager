import socketIo from "socket.io";
import { addItem, updateItem, getItem } from "../models/item";
import { addGroup, updateGroup } from "../models/group";
import db from "./jsonDb";
import Search from "./Search";

export default class SocketServer {
  constructor(httpServer) {
    console.log("Initializing socket server");
    this.io = socketIo(httpServer);
    this.io.on("connection", function(socket) {
      console.log("a user connected");
      socket.emit("config", db.getState());
      socket.on("addItem", data => {
        addItem(data);
        sendUpdatedConfigToAllClients();
      });
      socket.on("updateItem", data => {
        updateItem(data);
        sendUpdatedConfigToAllClients();
      });
      socket.on("addGroup", data => {
        addGroup(data);
        sendUpdatedConfigToAllClients();
      });
      socket.on("updateGroup", data => {
        updateGroup(data);
        sendUpdatedConfigToAllClients();
      });
      socket.on("search", input => {
        socket.emit("searchResult", Search.search(input));
      });
    });
  }

  sendUpdatedConfigToAllClients() {
    console.log("sendUpdatedConfigToAllClients");
    this.io.emit("config", db.getState());
  }
}
