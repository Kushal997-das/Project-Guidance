import 'package:flutter/material.dart';
import 'package:poke_book/pokemon.dart';

class PokeDetail extends StatelessWidget {

  final Pokemon pokemon;
  PokeDetail({this.pokemon});

  bodyWidget(BuildContext context) => Stack(
    children: <Widget>[
      Positioned(
        height: MediaQuery.of(context).size.height / 1.5,
        width: MediaQuery.of(context).size.width - 20,
        left: 10.0,
        top: MediaQuery.of(context).size.height * 0.1,
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0)),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              SizedBox(height: 50.0,),
              Text(pokemon.name,style: TextStyle(fontSize: 20.0,fontWeight: FontWeight.bold),),
              Text("Height: ${pokemon.height}"),
              Text("Weight: ${pokemon.weight}"),
              Text("Types"),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: pokemon.type.map((t) => FilterChip(
                  label: Text(t),
                  backgroundColor: Colors.amber,
                  onSelected: (b){},)).toList(),
              ),
              Text("Weakness"),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: pokemon.weaknesses.map((t) => FilterChip(
                  label: Text(t,style: TextStyle(color: Colors.white),),
                  backgroundColor: Colors.red,
                  onSelected: (b){},)).toList(),
              ),
            ],
          ),
        ),
      ),

      Align(
        alignment: Alignment.topCenter,
        child: Hero(tag: pokemon.img, child: Container(
          height: 180.0,
          width: 180.0,
          decoration: BoxDecoration(
            image: DecorationImage(image: NetworkImage(pokemon.img), fit: BoxFit.cover)
          ),
        )),
      )
    ],
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey,
      appBar: AppBar(
        title: Text(pokemon.name),
        centerTitle: true,
        backgroundColor: Colors.blueGrey,
        elevation: 0.0,
      ),
      body: bodyWidget(context),
    );
  }
}
