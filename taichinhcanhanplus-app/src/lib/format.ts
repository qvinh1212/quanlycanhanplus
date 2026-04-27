export function formatMoney(amount: number, currency = "VND") {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactMoney(amount: number) {
  if (Math.abs(amount) >= 1_000_000) {
    return `${(amount / 1_000_000).toLocaleString("vi-VN", {
      maximumFractionDigits: 1,
    })}tr`;
  }

  return `${(amount / 1_000).toLocaleString("vi-VN", {
    maximumFractionDigits: 0,
  })}k`;
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
