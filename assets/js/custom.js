function random(from, to) {
    // trunc vs floor ?
    //
    // #ref  Follow these links for the MSDN descriptions of:
    //
    //     Math.Floor, which rounds down towards negative infinity.
    //     Math.Ceiling, which rounds up towards positive infinity.
    //     Math.Truncate, which rounds up or down towards zero.
    //     Math.Round, which rounds to the nearest integer or specified number of decimal places. You can specify the behavior if it's exactly equidistant between two possibilities, such as rounding so that the final digit is even ("Round(2.5,MidpointRounding.ToEven)" becoming 2) or so that it's further away from zero ("Round(2.5,MidpointRounding.AwayFromZero)" becoming 3).
    // The following diagram and table may help:
    //
    //     -3        -2        -1         0         1         2         3
    // +--|------+---------+----|----+--|------+----|----+-------|-+
    //     a                     b       c           d            e
    //
    // a=-2.7  b=-0.5  c=0.3  d=1.5  e=2.8
    //     ======  ======  =====  =====  =====
    //     Floor                    -3      -1      0      1      2
    // Ceiling                  -2       0      1      2      3
    // Truncate                 -2       0      0      1      2
    // Round (ToEven)           -3       0      0      2      3
    // Round (AwayFromZero)     -3      -1      0      2      3
    // Note that Round is a lot more powerful than it seems, simply because it can round to a specific number of decimal places. All the others round to zero decimals always. For example:
    //
    //     n = 3.145;
    // a = System.Math.Round (n, 2, MidpointRounding.ToEven);       // 3.14
    // b = System.Math.Round (n, 2, MidpointRounding.AwayFromZero); // 3.15
    // With the other functions, you have to use multiply/divide trickery to achieve the same effect:
    //
    //     c = System.Math.Truncate (n * 100) / 100;                    // 3.14
    // d = System.Math.Ceiling (n * 100) / 100;                     // 3.15



    return Math.trunc(Math.random() * (to - from + 1) + from)
}

const getRandomChar = () => {
    const charRange = [
        [0x3041, 0x30ff],
        [0x0021, 0x007a],
        [0x00bc, 0x02af],

    ]

    const i = random(0, charRange.length - 1);
    const j = random(0, charRange.length - 1);
    return String.fromCharCode(random(charRange[i][j], charRange[i][j]));


}

const setUpColumn = (p, rowCount) => {
    const delay = random(100, 300);
    const duration = random(100, 2000);
    const hasChildren = p.children.length > 0;

    for (let j = 0; j < rowCount; j++) {
        const span = hasChildren ? p.children.item(j) : document.createElement('span');
        span.innerText = getRandomChar();
        const animation = span.animate([
            // 0%
            { 'opacity': '1' },
            //100%
            { 'opacity': '0.05' },
        ], {
            duration: duration,
            
            delay: delay + (j * 75),
            fill: 'forwards'
        });


        if (j === rowCount - 1) {
            // an async function
            // we try to schedule the animation to be executed after the previous one is finished
            // and this time we get the child of the p element and resign it to the span
            // the best time for doing this is when counter does have one more to count
            animation.onfinish = () => {
                setUpColumn(p, rowCount);
            }

        }
        if (!hasChildren) {
            p.appendChild(span);


        }
    }

}


const draw = () => {

    const columnCount = Math.floor(window.innerWidth / 30);
    const rowCount = Math.floor(window.innerHeight / 30);

    for (let i = 1; i < columnCount; i++) {
        // don't get confused display is flex !
        const p = document.createElement('p');
        setUpColumn(p, rowCount);
        document.body.appendChild(p);

    }

}

draw()