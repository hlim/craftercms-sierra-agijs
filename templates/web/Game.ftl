<#import "/templates/system/common/crafter.ftl" as crafter />

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>AGI test</title>
        <@crafter.head/>
    </head>
    <body>
        <@crafter.body_top/>
        <style>
             @font-face {
                font-family: agifont;
                src: url(/static-assets/app/sierra-agi-font.ttf);
            }
            
            canvas {
                width: 100%;
                height: 100%;
                image-rendering: -moz-crisp-edges;
                image-rendering: pixelated;
                border: 1px solid black;
            }
        </style>
        <canvas id="canvas" border='1' width="320" height="200"></canvas>
        <script src="/static-assets/app/agi.js"></script>



        <@crafter.body_bottom/>

        <script>
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            Agi.start("/static-assets/games/${contentModel.game_s}/", context);
        </script>

    </body>
</html>		
