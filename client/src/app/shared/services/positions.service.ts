import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Positionse} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private _http: HttpClient) {}

  fetch(categoryId: string): Observable<Positionse[]> {
    return this._http.get<Positionse[]>(`/api/position/${categoryId}`);
  }

  create(position: Positionse): Observable<Positionse> {
    return this._http.post<Positionse>('/api/position', position);
  }

  update(position: Positionse): Observable<Positionse> {
    return this._http.patch<Positionse>(`/api/position/${position._id}`, position);
  }

  delete(position: Positionse): Observable<Message> {
    return this._http.delete<Message>(`/api/position/${position._id}`);
  }
}
