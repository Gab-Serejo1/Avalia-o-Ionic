import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Livro } from "../model/livro";

@Injectable()
export class LivroService{

    firestore = firebase.firestore();//<--
    settings = {timestampsInSnapshots: true};//<--
    listaDeLivros : Livro[] = [];

    constructor(){
        this.firestore.settings(this.settings); //<--
    }

    getList() : Livro[]{

     

        var ref = this.firestore.collection("livro");
        
        ref.get().then(query => {
            query.forEach(doc => {
                let l = new Livro();
                l.setDados(doc.data());
                this.listaDeLivros.push(l);
            });
        });

        return this.listaDeLivros;
      }
}