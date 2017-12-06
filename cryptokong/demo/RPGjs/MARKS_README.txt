MAP JSON (2 BY 2 GRID)

"map": [
	[
		[ <-- X1 / Y1
			384, <-- This represents the first layer ID = PROPERTY REFERENCE
			407, <-- This represents the second layer
			null <-- This represents the third layer
		],
		[ <-- X1 / Y2
			384, <-- This represents the first layer ID = PROPERTY REFERENCE
			407, <-- This represents the second layer
			null <-- This represents the third layer
		]
	],
	[
		[ <-- X2 / Y1
			384, <-- This represents the first layer ID = PROPERTY REFERENCE
			407, <-- This represents the second layer
			null <-- This represents the third layer
		],
		[ <-- X2 / Y2
			384, <-- This represents the first layer ID = PROPERTY REFERENCE
			407, <-- This represents the second layer
			null <-- This represents the third layer
		]
	]
]
"propreties": {
	"384": [	<-- This number minus 383 equals grid number
				<-- Grid numbers start at 1 (384) move to right equals 2 (385)
				<-- Grids must be 256px Wide (Each square is 32px X 32px)
		0, <-- This means it is sol (below the hero)
		0 <-- This means it is passable
	],
	"407": [
		0, <-- This means it is sol (below the hero)
		15 <-- This means it is a solid object
	],
}

## ------------------------------------------------------------------------- ##

AUDIO - MUST SUPPLY OGG FORMAT (FOR NOW)

## ------------------------------------------------------------------------- ##

