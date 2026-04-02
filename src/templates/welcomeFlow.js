// import { addKeyword, EVENTS } from '@builderbot/bot';
// import Turno from '../models/turno.js';



// const welcomeFlow = addKeyword(EVENTS.WELCOME)
//   .addAction(async (ctx, ctxFn) => {
//     const state = await ctxFn.state.getMyState() || {};

//     // Paso 1: pedir nombre
//     if (!state.step) {
//       await ctxFn.state.update({ step: 1 });
//       return ctxFn.endFlow("👋 ¡Hola! Soy el asistente del consultorio dental. ¿Podés decirme tu nombre y apellido?");
//     }

//     // Paso 2: guardar nombre
//     if (state.step === 1) {
//       const nombre = ctx.body.trim();
//       await ctxFn.state.update({ step: 2, nombre });
//       return ctxFn.endFlow(`Encantado, ${nombre}. ¿Querés *ver turnos disponibles* o *ver los tuyos reservados*?`);
//     }

//     // Paso 3: mostrar turnos disponibles
//     if (state.step === 2 && /disponible|nuevo/i.test(ctx.body)) {
//       const turnos = await Turno.find().sort({ fecha: 1 });

//       if (turnos.length === 0) {
//         return ctxFn.endFlow("Por el momento no hay turnos disponibles 😅");
//       }

//       // Guardamos lista en el estado
//       await ctxFn.state.update({ step: 3, turnos });
//       const lista = turnos.map((t, i) => `${i + 1}. 📅 ${t.fecha} ⏰ ${t.hora} (${t.motivo})`).join('\n');
//       return ctxFn.endFlow(`Estos son los turnos disponibles:\n\n${lista}\n\nIndicame el número del turno que querés reservar.`);
//     }

//     // Paso 4: elegir un turno
//     if (state.step === 3) {
//       const index = parseInt(ctx.body.trim()) - 1;
//       const turnos = state.turnos || [];
//       const turnoSeleccionado = turnos[index];

//       if (!turnoSeleccionado) {
//         return ctxFn.endFlow("Número inválido. Por favor, elegí un número de la lista anterior.");
//       }

//       await ctxFn.state.update({ step: 4, turnoSeleccionado });
//       return ctxFn.endFlow(`Perfecto. ¿Querés confirmar el turno del ${turnoSeleccionado.fecha} a las ${turnoSeleccionado.hora}? (responde *sí* o *no*)`);
//     }

//     // Paso 5: confirmación
//     if (state.step === 4 && /si|sí/i.test(ctx.body)) {
//       const { turnoSeleccionado, nombre } = state;

//       // 🟢 OPCIÓN 1: eliminar el turno de la base (ya reservado)
//       await Turno.findByIdAndDelete(turnoSeleccionado._id);

//       // 🟢 OPCIÓN 2 (alternativa): marcarlo como reservado
//       // await Turno.findByIdAndUpdate(turnoSeleccionado._id, { motivo: `Reservado por ${nombre}` });

//       await ctxFn.state.clear();
//       return ctxFn.endFlow(`✅ Listo ${nombre}, reservé tu turno el ${turnoSeleccionado.fecha} a las ${turnoSeleccionado.hora}. ¡Te esperamos!`);
//     }

//     // Paso 6: cancelación
//     if (state.step === 4 && /no/i.test(ctx.body)) {
//       await ctxFn.state.clear();
//       return ctxFn.endFlow("Sin problema, no hice ninguna reserva. Si querés, podés volver a ver los turnos disponibles.");
//     }
//   });
// //export default welcomeFlow;

// export { welcomeFlow };





// import { addKeyword, EVENTS } from '@builderbot/bot';
// import Turno from '../models/turno.js';
// import User from '../models/user.js';

// const welcomeFlow = addKeyword(EVENTS.WELCOME)
//   .addAction(async (ctx, ctxFn) => {
//     const state = await ctxFn.state.getMyState() || {};

//     // 🧪 CHEQUEAR SI YA TIENE UN TURNO RESERVADO
//     const turnoExistente = await User.findOne({ telefono: ctx.from });

//     if (!state.step && turnoExistente) {
//       await ctxFn.state.update({ step: "tieneTurno" });

//       return ctxFn.endFlow(
//         `⚠️ Ya tenés un turno reservado.\n\n` +
//         `📅 *${turnoExistente.turno.fecha}*\n` +
//         `⏰ *${turnoExistente.turno.hora}*\n` +
//         `🦷 ${turnoExistente.turno.motivo}\n\n` +
//         `¿Querés cancelarlo?\n\n` +
//         `*1️⃣* Cancelar turno\n` +
//         `*2️⃣* Salir`
//       );
//     }

//     // 👉 Resolver si está en paso "tieneTurno"
//     if (state.step === "tieneTurno") {
//       const opcion = ctx.body.trim();

//       // CANCELAR TURNOS
//       if (opcion === "1") {
//         await User.findOneAndDelete({ telefono: ctx.from });
//         await ctxFn.state.clear();
//         return ctxFn.endFlow(
//           "🗑️ Tu turno fue cancelado.\n\n" +
//           "Si querés reservar otro turno, escribí *hola*."
//         );
//       }

//       // SALIR
//       if (opcion === "2") {
//         await ctxFn.state.clear();
//         return ctxFn.endFlow("Perfecto, seguimos en contacto.");
//       }

//       return ctxFn.endFlow("❌ Opción inválida. Elegí *1️⃣* o *2️⃣*.");
//     }

//     // Paso 1: pedir nombre
//     if (!state.step) {
//       await ctxFn.state.update({ step: 1 });
//       return ctxFn.endFlow(
//         "👋 ¡Hola! Soy el asistente del consultorio dental.\n\n" +
//         "¿Podés decirme tu *nombre y apellido*?"
//       );
//     }

//     // Paso 2: guardar nombre
//     if (state.step === 1) {
//       const nombre = ctx.body.trim();
//       await ctxFn.state.update({ step: 2, nombre });

//       return ctxFn.endFlow(
//         `Encantado, *${nombre}* 😄\n\n` +
//         `Elegí una opción:\n\n` +
//         `*1️⃣* Ver turnos disponibles\n` +
//         `*2️⃣* Ver mis turnos reservados`
//       );
//     }

//     // Paso 3: menú principal (1 o 2)
//     if (state.step === 2) {
//       const opcion = ctx.body.trim();
//       const nombre = state.nombre;

//       // Opción 1: turnos disponibles
//       if (opcion === "1") {
//         const turnos = await Turno.find().sort({ fecha: 1 });

//         if (turnos.length === 0) {
//           return ctxFn.endFlow("Por el momento no hay turnos disponibles 😅");
//         }

//         await ctxFn.state.update({ step: 3, turnos });

//         const lista = turnos
//           .map((t, i) => `*${i + 1}️⃣* 📅 ${t.fecha} ⏰ ${t.hora} – ${t.motivo}`)
//           .join('\n');

//         return ctxFn.endFlow(
//           `Estos son los turnos disponibles:\n\n${lista}\n\n` +
//           `👉 Decime el *número* del turno que querés reservar.`
//         );
//       }

//       // Opción 2: ver turnos reservados
//       if (opcion === "2") {
//         const userTurns = await User.find({ telefono: ctx.from });

//         if (userTurns.length === 0) {
//           return ctxFn.endFlow("Todavía no tenés turnos reservados 😄");
//         }

//         const lista = userTurns
//           .map((u, i) =>
//             `*${i + 1}️⃣* 📅 ${u.turno.fecha} ⏰ ${u.turno.hora} (${u.turno.motivo})`
//           )
//           .join('\n');

//         return ctxFn.endFlow(`Estos son tus turnos reservados:\n\n${lista}`);
//       }

//       return ctxFn.endFlow("❌ Opción inválida. Elegí *1️⃣* o *2️⃣*.");
//     }

//     // Paso 4: elegir turno numerado
//     if (state.step === 3) {
//       const index = parseInt(ctx.body.trim()) - 1;
//       const turnos = state.turnos || [];
//       const turnoSeleccionado = turnos[index];

//       if (!turnoSeleccionado) {
//         return ctxFn.endFlow("❌ Número inválido. Elegí un número de la lista.");
//       }

//       await ctxFn.state.update({ step: 4, turnoSeleccionado });

//       return ctxFn.endFlow(
//         `Perfecto 👌\n\n` +
//         `¿Querés confirmar este turno?\n\n` +
//         `📅 *${turnoSeleccionado.fecha}*\n` +
//         `⏰ *${turnoSeleccionado.hora}*\n` +
//         `🦷 ${turnoSeleccionado.motivo}\n\n` +
//         `Elegí una opción:\n` +
//         `*1️⃣* Confirmar\n` +
//         `*2️⃣* Cancelar`
//       );
//     }

//     // Paso 5: confirmación (1 o 2)
//     if (state.step === 4) {
//       const opcion = ctx.body.trim();
//       const { turnoSeleccionado, nombre } = state;

//       // CONFIRMAR
//       if (opcion === "1") {

//         await User.create({
//           nombre,
//           telefono: ctx.from,
//           turno: {
//             fecha: turnoSeleccionado.fecha,
//             hora: turnoSeleccionado.hora,
//             motivo: turnoSeleccionado.motivo
//           }
//         });

//         await Turno.findByIdAndDelete(turnoSeleccionado._id);

//         await ctxFn.state.clear();

//         return ctxFn.endFlow(
//           `🎉 *Turno confirmado, ${nombre}!* \n\n` +
//           `📅 *${turnoSeleccionado.fecha}*\n` +
//           `⏰ *${turnoSeleccionado.hora}*\n` +
//           `🦷 ${turnoSeleccionado.motivo}\n\n` +
//           `¡Te esperamos! 😄`
//         );
//       }

//       // CANCELAR
//       if (opcion === "2") {
//         await ctxFn.state.clear();
//         return ctxFn.endFlow("👌 Perfecto, no hice ninguna reserva.");
//       }

//       return ctxFn.endFlow("❌ Opción inválida. Elegí *1️⃣* o *2️⃣*.");
//     }
//   });

// export { welcomeFlow };

import { addKeyword, EVENTS } from '@builderbot/bot';
import Turno from '../models/turno.js';
import User from '../models/user.js';

import { sendTurnoEmail } from '../utils/sendEmail.js';

const tiposTurno = ['Caries', 'Extraccion', 'Implante', 'Control', 'Limpieza'];

const welcomeFlow = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, ctxFn) => {
    const state = await ctxFn.state.getMyState() || {};

    // ─────────────────────────────────────────────
    // PASO 0 — Verificar si el usuario ya tiene turno reservado
    // ─────────────────────────────────────────────
    const turnoExistente = await User.findOne({ telefono: ctx.from });

    if (turnoExistente && !state.step) {
      await ctxFn.state.update({ step: 'yaTieneTurno' });

      return ctxFn.endFlow(
        `🦷 *Ya tenés un turno reservado*\n\n` +
        `📅 *${turnoExistente.turno.fecha}*\n` +
        `⏰ *${turnoExistente.turno.hora}*\n\n` +
        `¿Querés cancelarlo?\n\n` +
        `1️⃣ Sí, cancelar el turno\n` +
        `2️⃣ No, mantenerlo`
      );
    }

    // ─────────────────────────────────────────────
    // PASO 0.1 — Si ya tiene turno
    // ─────────────────────────────────────────────
    if (state.step === 'yaTieneTurno') {
      const opcion = ctx.body.trim();

      if (opcion === "1") {
        const t = turnoExistente.turno;

        // Restituir el turno
        await Turno.create({
          fecha: t.fecha,
          hora: t.hora
        });

        // Eliminar turno del usuario
        await User.deleteOne({ telefono: ctx.from });
        await ctxFn.state.clear();

        // Enviar mail de cancelación
        await sendTurnoEmail({
          nombre: turnoExistente.nombre,
          telefono: turnoExistente.telefono,
          turno: t,
          accion: 'cancelado'
        });

        return ctxFn.endFlow("✔️ Tu turno fue cancelado y ya está disponible nuevamente.");
      }

      if (opcion === "2") {
        await ctxFn.state.clear();
        return ctxFn.endFlow("Perfecto 😊 Mantengo tu turno tal como está.");
      }

      return ctxFn.endFlow("❌ Opción inválida. Elegí 1️⃣ o 2️⃣.");
    }

    // ─────────────────────────────────────────────
    // PASO 1 — Pedir nombre
    // ─────────────────────────────────────────────
    if (!state.step) {
      await ctxFn.state.update({ step: 1 });

      return ctxFn.endFlow(
        "👋 ¡Hola! Soy el asistente del consultorio dental.\n\n" +
        "¿Podés decirme tu *nombre y apellido*?"
      );
    }

    // ─────────────────────────────────────────────
    // PASO 2 — Guardar nombre y mostrar menú
    // ─────────────────────────────────────────────
    if (state.step === 1) {
      const nombre = ctx.body.trim();
      await ctxFn.state.update({ step: 2, nombre });

      return ctxFn.endFlow(
        `Encantado, *${nombre}* 😄\n\n` +
        `Elegí una opción:\n\n` +
        `1️⃣ Ver turnos disponibles\n` +
        `2️⃣ Ver mis turnos reservados`
      );
    }

    // ─────────────────────────────────────────────
    // PASO 3 — Selección del menú
    // ─────────────────────────────────────────────
    if (state.step === 2) {
      const opcion = ctx.body.trim();
     // const nombre = state.nombre;

      // ► Opción 1: ver turnos disponibles
      if (opcion === "1") {
        const turnos = await Turno.find().sort({ fecha: 1 });

        if (turnos.length === 0) {
          return ctxFn.endFlow("😅 No hay turnos disponibles por el momento.");
        }

        await ctxFn.state.update({ step: 3, turnos });

        const lista = turnos
          .map((t, i) => `${i + 1}️⃣  📅 ${t.fecha} — ⏰ ${t.hora}`)
          .join('\n');

        return ctxFn.endFlow(
          `🦷 *Turnos disponibles*\n\n${lista}\n\n` +
          `Decime qué turno querés. Elegí un número.`
        );
      }

      // ► Opción 2: ver turnos reservados
      if (opcion === "2") {
        const misTurnos = await User.find({ telefono: ctx.from });

        if (misTurnos.length === 0) {
          return ctxFn.endFlow("No tenés turnos reservados todavía.");
        }

        const lista = misTurnos
          .map((u, i) => `${i + 1}️⃣  📅 ${u.turno.fecha} — ⏰ ${u.turno.hora}`)
          .join('\n');

        return ctxFn.endFlow(`🦷 *Tus turnos reservados:*\n\n${lista}`);
      }

      return ctxFn.endFlow("❌ Opción inválida. Elegí 1️⃣ o 2️⃣.");
    }

    // ─────────────────────────────────────────────
    // PASO 4 — Selección del turno disponible
    // ─────────────────────────────────────────────
    if (state.step === 3) {
      const index = parseInt(ctx.body.trim()) - 1;
      const turnos = state.turnos || [];
      const turnoSeleccionado = turnos[index];

      if (!turnoSeleccionado) {
        return ctxFn.endFlow("Número inválido. Elegí un número de la lista.");
      }

      await ctxFn.state.update({ step: 4, turnoSeleccionado });

      return ctxFn.endFlow(
        `Perfecto 👌\n\n` +
        `Para qué tipo de turno es?\n` +
        tiposTurno.map((t, i) => `${i + 1}️⃣ ${t}`).join('\n')
      );
    }

    // ─────────────────────────────────────────────
    // PASO 4.1 — Selección del tipo de turno
    // ─────────────────────────────────────────────
    if (state.step === 4) {
      const opcion = parseInt(ctx.body.trim()) - 1;
      if (opcion < 0 || opcion >= tiposTurno.length) {
        return ctxFn.endFlow("❌ Opción inválida. Elegí un número válido del 1 al " + tiposTurno.length);
      }

      const tipoTurno = tiposTurno[opcion];
      await ctxFn.state.update({ step: 5, tipoTurno });

      const { turnoSeleccionado } = state;

      return ctxFn.endFlow(
        `Perfecto 👌\n\n` +
        `Querés confirmar este turno?\n\n` +
        `📅 *${turnoSeleccionado.fecha}*\n` +
        `⏰ *${turnoSeleccionado.hora}*\n` +
        `🦷 *${tipoTurno}*\n\n` +
        `1️⃣ Confirmar\n` +
        `2️⃣ Cancelar`
      );
    }

    // ─────────────────────────────────────────────
    // PASO 5 — Confirmar o cancelar turno
    // ─────────────────────────────────────────────
    if (state.step === 5) {
      const opcion = ctx.body.trim();
      const { turnoSeleccionado, nombre, tipoTurno } = state;

      // ► Confirmar
      if (opcion === "1") {
        const nuevoUsuario = await User.create({
          nombre,
          telefono: ctx.from,
          turno: {
            fecha: turnoSeleccionado.fecha,
            hora: turnoSeleccionado.hora,
            motivo: tipoTurno
          }
        });

        await Turno.findByIdAndDelete(turnoSeleccionado._id);
        await ctxFn.state.clear();

        // Enviar email de confirmación
        await sendTurnoEmail({ ...nuevoUsuario, accion: 'confirmado' });

        return ctxFn.endFlow(
          `🎉 *Turno confirmado ${nombre}*\n\n` +
          `📅 *${turnoSeleccionado.fecha}*\n` +
          `⏰ *${turnoSeleccionado.hora}*\n` +
          `🦷 *${tipoTurno}*\n\n` +
          `¡Te esperamos!`
        );
      }

      // ► Cancelar
      if (opcion === "2") {
        await Turno.create({
          fecha: turnoSeleccionado.fecha,
          hora: turnoSeleccionado.hora
        });

        await ctxFn.state.clear();

        // Enviar email de cancelación
        await sendTurnoEmail({
          nombre,
          telefono: ctx.from,
          turno: { fecha: turnoSeleccionado.fecha, hora: turnoSeleccionado.hora },
          accion: 'cancelado'
        });

        return ctxFn.endFlow("👌 Operación cancelada. El turno volvió a estar disponible.");
      }

      return ctxFn.endFlow("❌ Opción inválida. Elegí 1️⃣ o 2️⃣.");
    }
  });

export { welcomeFlow };
