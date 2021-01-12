import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { User } from '.';

interface UserWithId {
	user?: User & { _id: string };
}

export type Request = Req & UserWithId;
export type Response = Res & UserWithId;
export type NextFunction = Next;
