
import { db } from "./database";
import { sessionStore } from './session-store';
import { Request, Response } from "express";

export function readAllLessons(req:Request, res:Response) {

  const sessionId =req.cookies["SESSIONID"];

  const isSessionValid = sessionStore.isSessionValid(sessionId);

  if(!isSessionValid){
    return res.sendStatus(403);
  }

  return res.status(200).json({ lessons: db.readAllLessons() });

}
