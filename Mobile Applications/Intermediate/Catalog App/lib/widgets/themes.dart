import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:velocity_x/velocity_x.dart';

class MyTheme {
  static ThemeData lightTheme(BuildContext context) => ThemeData(
      primarySwatch: Colors.deepPurple,
      fontFamily: GoogleFonts.poppins().fontFamily,
      cardColor: Colors.white,
      canvasColor: creamColor,
      buttonColor: darkBluishColor,
      accentColor: darkBluishColor,
      appBarTheme: AppBarTheme(
          color: Colors.white,
          elevation: 0.0,
          iconTheme: IconThemeData(color: Colors.black),
          centerTitle: true,
          toolbarTextStyle: Theme.of(context)
              .textTheme
              .copyWith(
                  headline6: context.textTheme.headline6!
                      .copyWith(color: Colors.black))
              .bodyText2,
          titleTextStyle: Theme.of(context)
              .textTheme
              .copyWith(
                  headline6: context.textTheme.headline6!
                      .copyWith(color: Colors.black))
              .headline6));

  static ThemeData darkTheme(BuildContext context) => ThemeData(
      brightness: Brightness.dark,
      fontFamily: GoogleFonts.poppins().fontFamily,
      cardColor: Colors.black,
      canvasColor: darkCreamColor,
      buttonColor: lightBluishColor,
      accentColor: Colors.white,
      appBarTheme: AppBarTheme(
        color: Colors.black,
        elevation: 0.0,
        iconTheme: IconThemeData(color: Colors.white),
        centerTitle: true,
        toolbarTextStyle: Theme.of(context)
            .textTheme
            .copyWith(
                headline6:
                    context.textTheme.headline6!.copyWith(color: Colors.white))
            .bodyText2,
        titleTextStyle: Theme.of(context)
            .textTheme
            .copyWith(
                headline6:
                    context.textTheme.headline6!.copyWith(color: Colors.white))
            .headline6,
      ));

  // Colors
  static Color creamColor = Color(0xfff5f5f5);
  static Color darkCreamColor = Vx.gray800;
  static Color darkBluishColor = Color(0xff403b58);
  static Color lightBluishColor = Vx.indigo700;
}
