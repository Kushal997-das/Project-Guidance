//Eyes
const retina = document.querySelectorAll(".eye-retina");

window.addEventListener("mousemove", (e) => {
    e = e || window.event;

    //Position of cursor in pixel
    const { pageX, pageY } = e;

    //Available area of window
    const { innerWidth, innerHeight } = window;

    //Cursor left position in percentage
    let left = (pageX / innerWidth) * 100;

    //Cursor top  position in percentage
    let top = (pageY / innerHeight) * 100;

    //Prevent the eye from getting hidden at the left and right end.
    left = left < 25 ? 25 : left;
    left = left > 75 ? 75 : left;

    //Prevent the eye from getting hidden at the top and bottom end.
    top = top < 25 ? 25 : top;
    top = top > 75 ? 75 : top;

    //Move the eye
    retina.forEach((f) => {
        //If the cursor is in center of both the eyes the keep the eye in center
        f.style.left = `${left > 45 && left < 55 ? 50 : left}%`;
        f.style.top = `${top > 45 && top < 55 ? 50 : top}%`;
    });
});