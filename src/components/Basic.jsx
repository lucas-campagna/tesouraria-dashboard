
export const Card = ({ children }) => (
    <div class="card">
        {children}
    </div>
)

export const Grid = ({ size, children }) => (
    <div class={`grid grid-cols-${size}`}>
        {children}
    </div>
)