import { Component } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  pokemonsLista = [];
  listaUrl = [];
  data: any[] = [];

  async getPokemons(){

    await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200')
    .then((response)=>{
      this.pokemonsLista = response.data.results;

      response.data.results.forEach(element => {
        this.listaUrl.push(element.url)});

        for(let i=0; i< this.listaUrl.length; i++ ){
          axios.get(this.listaUrl[i]).then( response =>{
            this.data.push(response.data)
            }).catch(error=>
            console.log(error)
            )
        }

      console.log(this.data)

    }).catch((error)=>{
      console.log(error)
    })
  }

  constructor(){

    this.getPokemons()
  }

}
