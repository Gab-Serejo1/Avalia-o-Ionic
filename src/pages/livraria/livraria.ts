import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Livro } from '../../model/livro';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-livraria',
  templateUrl: 'livraria.html',
})
export class LivrariaPage {

  listaDeLivros : Livro[] = [];//<--
  firestore = firebase.firestore();// Inicio um instancia do banco
  settings = {timestampsInSnapshots: true};//<--

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public menu: MenuController) {

      this.firestore.settings(this.settings)
  }

  ionViewDidLoad() {
    this.menu.enable(true);
    this.getList();
  }

  getList() {

    var ref = firebase.firestore().collection("livro");
    ref.get().then(query => {
        query.forEach(doc => {
            let l = new Livro();
            l.setDados(doc.data());
            l.id = doc.id;
            this.listaDeLivros.push(l);
        });
    });

  }

  novoLivro(){
    this.navCtrl.push('NovoLivroPage');
  }

  remove(obj : Livro){
    var ref = firebase.firestore().collection("livro");
    ref.doc(obj.id).delete()
      .then(()=>{
        this.listaDeLivros = [];
        this.getList();
      }).catch(()=>{
        console.log('Erro ao atualizar');
      })
  }

  atualiza(obj : Livro){
    this.navCtrl.push('LivroVisualizaPage',{'livro' : obj})
  }

}



