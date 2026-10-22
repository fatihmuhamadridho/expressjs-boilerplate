import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { TodoCommand, TodoQuery } from '../../domain/repository/todo.repository';

export type TodoQueryDTO = TodoQuery;
export type TodoCommandDTO = TodoCommand;
export type TodoResultDTO = ResourceResult;
