export default function MockNotice({ children }) {
  return (
    <div className="mock-notice mb-3" role="note">
      <strong>Heads up:</strong>{' '}
      {children ||
        'FakeStoreAPI is a mock backend. Create, update, and delete requests succeed and return data, but changes do not persist on the server.'}
    </div>
  );
}
