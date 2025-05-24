export function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          Powered by{' '}
          <a
            href="https://sign.global"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF6600] hover:underline"
          >
            Sign Protocol
          </a>
        </p>
      </div>
    </footer>
  );
}