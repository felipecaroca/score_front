<template>
  <v-container>
    <v-row>
      <v-col>
        <p>
          Para comenzar primero debe iniciar sesión en el sistema presionando el botón <b>iniciar sesión</b> de la parte
          superior derecha.
        </p>
        <p>
          si no tienes una cuenta puedes crearla en el mismo lugar.
        </p>
        <p>
          si ya tienes tu cuenta y te encuentras logueado solo debes seguir los siguientes pasos:
        </p>
      </v-col>
      <v-col align="center">
        <v-img :src="loginBtn" width="150"/>
      </v-col>
    </v-row>
    <h1 class="display-1">Crea Equipos</h1>
    <v-row>
      <v-col>
        <v-img :src="team" class="elevation-1" width="400"/>
      </v-col>
      <v-col>
        <v-img :src="teamEdit" class="elevation-1" width="400"/>
      </v-col>
      <v-col>
        <p>
          Crea y maneja tus equipo, para esto debes entrar al menú <b>Equipos</b> del menú que aparece al presionar tu
          nombre de usuario en la parte superior izquierda.</p>
        <p>
          Acá podrás crear nuevos equipos que jugarán agregando el nombre y su logo, además de editar o eliminar
          equipos existentes.
        </p>
        <p>Además puedes agrega los miembros del equipo mediante el menú de edición</p>
      </v-col>
    </v-row>
    <h1 class="display-1" align="right">Crea Partidos</h1>
    <v-row>
      <v-col md="4">
        <p>
          En el menú partidos puedes crear nuevos encuentros que se jugarán, agregando la fecha, hora y los equipos que
          se enfrentarán.
        </p>
        <p>
          Una vez creado el encuentro, puedes definir la formación de los equipos presionando el botón con el ícono
          <v-icon color="info">mdi-account-multiple-check</v-icon>
        </p>
        <v-img :src="games"  />
        <v-img :src="formation"  />
      </v-col>
      <v-col align="center" md="8">
        <v-img :src="newGame"  />
      </v-col>
    </v-row>
    <h1 class="display-1">Maneja el Score del partido cuando se produzca el encuentro</h1>
    <v-row>
      <v-col md="8">
        <v-img :src="games" />
        <v-img :src="score" />
      </v-col>
      <v-col md="4">
        <p>
          Ingresa al marcador del partido presionando sobre el botón con el icono
          <v-icon color="success">mdi-soccer</v-icon>
        </p>
        <p>
          Acá podrás agregar los eventos del partido, tales como: amarillas, rojas, goles, cambios.
        </p>
        <p>
          Por otra parte, puedes mostrar el marcador del partido en una ventana nueva para poder proyectar hacia el
          público del partido
        </p>
        <v-img :src="scorePublic" width="500" />
      </v-col>
    </v-row>
    <h1 class="display-1" align="right">Visualizar Resultados de Partidos</h1>
    <v-row>
      <v-col md="8">
        <v-img :src="games" />
        <v-img :src="result"  />
      </v-col>
      <v-col md="4">
        <p>
          Puedes visualizar los resultados de cada partido presionando sobre el botón con el ícono
          <v-icon color="success">mdi-file</v-icon>. Este botón te mostrará un resumen del partido similar al que se
          muestra en la imagen izquierda.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import loginBtn from './../assets/presentation/login_btn.png'
  import team from './../assets/presentation/team.png'
  import teamEdit from './../assets/presentation/team_edit.png'
  import newGame from './../assets/presentation/new_game.png'
  import formation from './../assets/presentation/formation.png'
  import games from './../assets/presentation/games.png'
  import score from './../assets/presentation/score.png'
  import scorePublic from './../assets/presentation/score_public.png'
  import result from './../assets/presentation/result.png'

  export default {
    data: () => ({
      team, teamEdit,
      loginBtn, newGame,
      formation,games, score, scorePublic,
      result
    }),
  }
</script>
