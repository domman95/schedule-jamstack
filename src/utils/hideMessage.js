export default function hideMessage(setter, state, text) {
  setTimeout(() => {
    setter((prev) => ({ ...prev, isMessage: state, textMessage: text }));
  }, 3000);
}
