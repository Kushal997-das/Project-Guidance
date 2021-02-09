import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:poke_book/pokeDetail.dart';
import 'package:poke_book/pokemon.dart';
import 'dart:convert';

void main() => runApp(MaterialApp(
  title: "Poke Book",
  theme: ThemeData(primarySwatch: Colors.blueGrey),
  debugShowCheckedModeBanner: false,
  home: HomePage(),
));

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  var url = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";

  PokeHub pokeHub;

  @override
  void initState() {
    super.initState();

    fetchData();
  }

  fetchData() async{
    var res = await http.get(url);
    var decodedVal = jsonDecode(res.body);

    pokeHub =  PokeHub.fromJson(decodedVal);
    setState(() {

    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //backgroundColor: Colors.blueGrey,
        appBar: AppBar(
          title: Text("PokemonBook"),
          centerTitle: true,
          backgroundColor: Colors.blueGrey,
        ),
        body: pokeHub == null ? Center(
          child: CircularProgressIndicator(),
        )
            : GridView.count(
          crossAxisCount: 2,
          children: pokeHub.pokemon.map((poke) => Padding(
            padding: const EdgeInsets.all(2.0),
            child: InkWell( // give on-tap material effect property or use just a detector(GestureDetector)
              onTap: (){
                Navigator.push(context, MaterialPageRoute(
                  builder: (context) => PokeDetail(pokemon: poke,)
                ));
              },
              child: Card(
                elevation: 3.0,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    Hero(
                      tag: poke.img,
                      child: Container(
                        height: 100.0,
                        width: 100.0,
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: NetworkImage(poke.img),
                          ),
                        ),
                      ),
                    ),
                    Text(poke.name,style: TextStyle(fontSize: 22.0,fontWeight: FontWeight.bold),)
                  ],
                ),
              ),
            ),
          )).toList(),
        ),
        drawer: Drawer(),
        floatingActionButton: FloatingActionButton(onPressed: (){},
          child: Icon(Icons.refresh),
        )
    );
  }
}
