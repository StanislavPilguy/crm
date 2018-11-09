import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Category, Message} from "../interfaces";


@Injectable({
	providedIn: 'root'
})
export class CategoriesService {
	constructor(private _http: HttpClient) {
	}

	fetch(): Observable<Category[]> {
		return this._http.get<Category[]>('/api/category')
	}

	getById(id: string): Observable<Category> {
		return this._http.get<Category>(`/api/category/${id}`);
	}

	create(name: string, image?: File): Observable<Category> {
		const fd = new FormData();

		if (image) {
			fd.append('image', image, image.name)
		}
		fd.append('name', name );

		return this._http.post<Category>('/api/category/', fd)

	}

	update(id: string, name: string, image?: File): Observable<Category> {
		const fd = new FormData();

		if (image) {
			fd.append('image', image, image.name)
		}
		fd.append('name', name );

		return this._http.patch<Category>(`/api/category/${id}`, fd)
	}

	delete(id: string): Observable<Message> {
    return this._http.delete<Message>(`/api/category/${id}`)
  }

}


