const currentUser = "mahmoud"; // أو "salma"
const chatPath = "starko/chat";

// إرسال الرسالة
function sendMessage() {
  const msgInput = document.getElementById("message");
  const text = msgInput.value.trim();
  if (text === "") return;

  const timestamp = Date.now();

  const messageData = {
    sender: currentUser,
    text,
    timestamp,
    seen: false
  };

  database.ref(chatPath).push(messageData);
  msgInput.value = "";

  updateLastSeen(); // تحديث آخر ظهور
}

// استقبال الرسائل
database.ref(chatPath).on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const msgKey = snapshot.key;

  const chatBox = document.getElementById("chat-box");

  const wrapper = document.createElement("div");
  wrapper.className = msg.sender === currentUser ? "msg mine" : "msg other";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = msg.text;

  const status = document.createElement("div");
  status.className = "status";

  if (msg.sender === currentUser) {
    status.textContent = msg.seen ? "✅ تمت القراءة" : "✔️ مرسلة";
  } else {
    markAsSeen(msgKey); // تحديث المقروء
  }

  wrapper.appendChild(bubble);
  wrapper.appendChild(status);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// تحديث الرسائل إلى "مقروءة"
function markAsSeen(key) {
  database.ref(`${chatPath}/${key}`).update({ seen: true });
}

// تحديث آخر ظهور
function updateLastSeen() {
  database.ref(`starko/lastSeen/${currentUser}`).set(Date.now());
}

// عرض آخر ظهور للطرف الآخر
const otherUser = currentUser === "mahmoud" ? "salma" : "mahmoud";
database.ref(`starko/lastSeen/${otherUser}`).on("value", (snapshot) => {
  const time = snapshot.val();
  const header = document.querySelector(".chat-header");
  if (time) {
    header.textContent = `آخر ظهور للطرف الآخر: ${timeAgo(new Date(time))}`;
  }
});

// تحويل الوقت لعرض مفهوم
function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "الآن";
  if (diff < 3600) return `${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ساعة`;
  return `${Math.floor(diff / 86400)} يوم`;
}
