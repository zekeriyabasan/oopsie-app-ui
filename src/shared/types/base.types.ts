export interface BaseEntity {
  id: string; // Guid → string
  createdAt: string; // DateTime → ISO string
  recordStatus: string; // char → string (örn: "A", "P")
}
