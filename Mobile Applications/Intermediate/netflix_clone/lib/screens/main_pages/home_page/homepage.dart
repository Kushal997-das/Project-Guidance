import 'package:flutter/material.dart';
import 'package:netflix_clone/screens/main_pages/home_page/models/WatchAgainOnNetflixModel.dart';
import 'models/PopularOnNetflixModel.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final PageController controller = PageController();
    return Scaffold(
      backgroundColor: const Color(0xff0c0c0c),
      body: Stack(
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Stack(children: [
                  ShaderMask(
                    shaderCallback: (rect) {
                      return const LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.black, Colors.transparent],
                      ).createShader(
                          Rect.fromLTRB(0, 0, rect.width, rect.height));
                    },
                    blendMode: BlendMode.dstIn,
                    child: SizedBox(
                      height: MediaQuery.of(context).size.height * .65,
                      child: PageView(
                        controller: controller,
                        children: [
                          Image.network(
                            'https://resizing.flixster.com/bKS7Vsg6vEhEOAHq-qPfhFfCD48=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNGM0MTVmNDQtZjE3Yi00NmY5LWE4YmMtMWE2N2I5ZGU2MDUwLmpwZw==',
                            fit: BoxFit.cover,
                          ),
                          Image.network(
                            'https://resizing.flixster.com/nF81IFSnU_GuxV1dr4JvtWlESbA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzMxMWU5OTM4LWVkODctNDAyNC04OGE1LTg2ZjJiZTgxY2U2OS5qcGc=',
                            fit: BoxFit.cover,
                          ),
                          Image.network(
                            'https://m.media-amazon.com/images/M/MV5BOGEzYzcxYjAtZmZiNi00YzI0LWIyY2YtOTM0MDFjODU2YTZiXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg',
                            fit: BoxFit.cover,
                          ),
                          Image.network(
                            'https://m.media-amazon.com/images/M/MV5BZjdjOTQwY2UtZDM5Zi00YTU0LWIzOTQtMTFjZThmZDNhOWZhXkEyXkFqcGdeQXVyMTE0MTY2Mzk2._V1_.jpg',
                            fit: BoxFit.cover,
                          ),
                        ],
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 60,
                    width: MediaQuery.of(context).size.width,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 40),
                      child: Row(
                        mainAxisSize: MainAxisSize.max,
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Column(
                            children: const [
                              Icon(
                                Icons.add,
                                color: Colors.white,
                              ),
                              Text(
                                "My List",
                                style: TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                          ElevatedButton.icon(
                              onPressed: () {},
                              style: ElevatedButton.styleFrom(
                                primary: Colors.white,
                                onPrimary: Colors.black,
                                padding: const EdgeInsets.only(top: 10, bottom: 10, left: 20, right: 30)
                              ),
                              icon: const Icon(Icons.play_arrow_rounded),
                              label: const Text("Play")),
                          Column(
                            children: const [
                              Icon(
                                Icons.info_outline,
                                color: Colors.white,
                              ),
                              Text(
                                "Info",
                                style: TextStyle(color: Colors.white),
                              )
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ]),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: Text(
                    "Popular on Netflix",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      for (var i = 0; i < 5; i++)
                        PopularMovies(
                          index: i
                        )
                    ],
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: Text(
                    "Watch it Again",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      for (var i = 0; i < 5; i++)
                        WatchAgain(
                          index: i,
                        )
                    ],
                  ),
                ),
              ],
            ),
          ),
          ShaderMask(
            shaderCallback: (rect) {
              return const LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.black, Colors.transparent],
              ).createShader(Rect.fromLTRB(0, 0, rect.width, rect.height));
            },
            blendMode: BlendMode.dstIn,
            child: Container(
              color: Colors.black,
              height: MediaQuery.of(context).size.height * .3,
            ),
          ),
          Container(
            padding: const EdgeInsets.only(top: 38, left: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Image.asset(
                  'assets/images/netflix_symbol.png',
                  height: 84,
                ),
                Row(
                  children: [
                    TextButton(
                        onPressed: () {},
                        child: Text(
                          "TV Shows",
                          style: TextStyle(
                              color: Colors.white.withOpacity(.8),
                              fontSize: 14),
                        )),
                    TextButton(
                      onPressed: () {},
                      child: Text("Movies",
                          style: TextStyle(
                              color: Colors.white.withOpacity(.8),
                              fontSize: 14)),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: Text("My List",
                          style: TextStyle(
                              color: Colors.white.withOpacity(.8),
                              fontSize: 14)),
                    )
                  ],
                )
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color(0xff0c0c0c),
        selectedItemColor: const Color(0xffe50914),
        unselectedItemColor: const Color(0x80ffffff),
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: "Search"),
          BottomNavigationBarItem(
              icon: Icon(Icons.movie), label: "Coming Soon"),
          BottomNavigationBarItem(
              icon: Icon(Icons.download), label: "Downloads"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}

List<PopularOnNetflixModel> popular_on_netflix = [
  PopularOnNetflixModel('2016 | U/A 16+ | 4 Seasons | Teen TV Shows',
      'https://static.wikia.nocookie.net/strangerthings8338/images/7/74/Stranger_Things_4_Poster.jpg/revision/latest?cb=20220509161833'),
  PopularOnNetflixModel('2022 | A | 3h 5m | Action & Adventure',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG6L2WmlrU5r2HzTKoXTJC5DFyU9vMbUJ79Cp5P7RB5QEEnXkH'),
  PopularOnNetflixModel('2022 | A | 2h 12m | Bollywood Movies',
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS_k_6XjZe2QxMVtIslXrAamfoaHaW4jTuUF_EO9Soid6mGbAq-'),
  PopularOnNetflixModel('2022 | U/A 16+ | 2h 9m | Movies Based on Books',
      'https://upload.wikimedia.org/wikipedia/en/thumb/5/59/The_Gray_Man_poster.png/220px-The_Gray_Man_poster.png'),
  PopularOnNetflixModel('2020 | A | 1h 57m | Movies Based on Books',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRELEr5bWH1Z9ZlYjofDbRoW0ToFJop6YlcJuVU8lAYt2peph_n'),
];
List<WatchAgainOnNetflixModel> watch_again_on_netflix = [
  WatchAgainOnNetflixModel('2017 | A | 2h 21m | Action & Adventure',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8Z9j2RpJ2_Syro4zbG7zxFB9WHmDcIC1EOf_-qTg&usqp=CAE&s'),
  WatchAgainOnNetflixModel('2012 | U/A 13+ | 2h 44m | Action & Adventure',
      'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_FMjpg_UX1000_.jpg'),
  WatchAgainOnNetflixModel('2020 | A | 1h 43m | Action & Adventure',
      'https://upload.wikimedia.org/wikipedia/en/e/ec/Monster_Hunter_Film_Poster.jpg'),
  WatchAgainOnNetflixModel('2020 | A | 2h 5m | Movies Based on Books',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRJ2Nvloof0ra-_0SVISuKafVlXOCLVBRq_adEIGMx2f9Y1xgWE'),
  WatchAgainOnNetflixModel('2019 | U/A 13+ | 2h 9m | Action & Adventure',
      'https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/Spider-Man-FarFromHome-rating.jpg?itok=CGe-MMMn'),
];

class PopularMovies extends StatelessWidget {
  const PopularMovies({Key? key, required this.index}) : super(key: key);

  final int index;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: (popular_on_netflix.length - 1 == index)
          ? const EdgeInsets.only(right: 0)
          : const EdgeInsets.only(right: 8),
      child: GestureDetector(
        onTap: (){},
        child: Image.network(
          popular_on_netflix[index].image,
          width: 150,
          height: 200,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}

class WatchAgain extends StatelessWidget {
  const WatchAgain({Key? key, required this.index}) : super(key: key);

  final int index;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: (watch_again_on_netflix.length - 1 == index)
          ? const EdgeInsets.only(right: 0)
          : const EdgeInsets.only(right: 8),
      child: GestureDetector(
        onTap: (){},
        child: Image.network(
          watch_again_on_netflix[index].image,
          width: 150,
          height: 200,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}